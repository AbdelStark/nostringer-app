"use client";

import { useState, useEffect } from "react";
import { hexToBytes } from "@noble/hashes/utils";
import { sign, verify } from "nostringer";
import UserList, { UserKey } from "../components/UserList";
import SignVerifyPanel from "../components/SignVerifyPanel";
import Script from "next/script";
import { NostrTools } from "../lib/NostrTools";
import * as secp256k1 from "@noble/secp256k1";
import RingSignatureDemo from "../components/RingSignatureDemo";

const NUM_RING = 5;
const NUM_NORMAL = 2;

export default function Home() {
  const [userKeys, setUserKeys] = useState<UserKey[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NostRinger",
    description:
      "Anonymous ring signatures with Nostr keys - a demonstration of cryptographic privacy",
    applicationCategory: "Cryptography",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "NostRinger Team",
    },
  };

  const generateAllKeys = (): UserKey[] => {
    const newKeys: UserKey[] = [];
    // Generate ring members
    for (let i = 1; i <= NUM_RING; i++) {
      const keyPair = NostrTools.generateKeyPair();
      newKeys.push({
        label: `Ring User ${i}`,
        priv: keyPair.privateKeyHex,
        pub: keyPair.publicKeyHex,
        inRing: true,
      });
    }
    // Generate normal users
    for (let j = 1; j <= NUM_NORMAL; j++) {
      const keyPair = NostrTools.generateKeyPair();
      newKeys.push({
        label: `Normal User ${j}`,
        priv: keyPair.privateKeyHex,
        pub: keyPair.publicKeyHex,
        inRing: false,
      });
    }
    return newKeys;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("nostrKeys");
    if (stored) {
      try {
        const parsed: UserKey[] = JSON.parse(stored);
        setUserKeys(parsed);
      } catch {
        const initialKeys = generateAllKeys();
        setUserKeys(initialKeys);
        localStorage.setItem("nostrKeys", JSON.stringify(initialKeys));
      }
    } else {
      const initialKeys = generateAllKeys();
      setUserKeys(initialKeys);
      localStorage.setItem("nostrKeys", JSON.stringify(initialKeys));
    }
  }, []);

  const handleSelectUser = (index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyChange = (index: number, newPriv: string) => {
    try {
      const privKeyBytes = hexToBytes(newPriv);
      const pubKey = secp256k1.ProjectivePoint.fromPrivateKey(privKeyBytes);
      const newPub = pubKey.x.toString(16).padStart(64, "0");

      setUserKeys((prevKeys) => {
        const updated = [...prevKeys];
        updated[index] = { ...updated[index], priv: newPriv, pub: newPub };
        localStorage.setItem("nostrKeys", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Invalid private key:", error);
    }
  };

  const handleRegenerateAll = () => {
    const ok = confirm(
      "Generate new keys? This will replace all existing keys.",
    );
    if (!ok) return;
    const newKeys = generateAllKeys();
    setUserKeys(newKeys);
    localStorage.setItem("nostrKeys", JSON.stringify(newKeys));
    setSelectedIndex(0);
    setSignature(null);
    setVerifyResult(null);
  };

  const handleSign = async () => {
    if (!message || selectedIndex == null) return;
    const signer = userKeys[selectedIndex];
    try {
      const ringPubKeys = userKeys.filter((u) => u.inRing).map((u) => u.pub);
      const sig = await sign(message, signer.priv, ringPubKeys);

      // Convert the signature to a JSON string for storage
      const sigString = JSON.stringify(sig);
      setSignature(sigString);
      setVerifyResult(null);
    } catch (err) {
      console.error("Signing error:", err);
      setSignature(null);
      setVerifyResult(null);
    }
  };

  const handleVerify = async () => {
    if (!signature || !message) return;
    const ringPubKeys = userKeys.filter((u) => u.inRing).map((u) => u.pub);
    try {
      // Parse the signature back from string
      const sigObj = JSON.parse(signature);
      const result = await verify(sigObj, message, ringPubKeys);
      setVerifyResult(result);
    } catch (err) {
      console.error("Verification error:", err);
      setVerifyResult(false);
    }
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-terminalBg text-neonGreen font-mono py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Terminal window header */}
          <div className="bg-gray-900 rounded-t-lg p-3 flex items-center border-b border-gray-700">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-neonRed"></div>
              <div className="w-3 h-3 rounded-full bg-neonYellow"></div>
              <div className="w-3 h-3 rounded-full bg-neonGreen"></div>
            </div>
            <div className="text-center flex-1">
              <h1 className="text-2xl text-neonGreen font-bold tracking-wide glow-text">
                NostRinger
              </h1>
            </div>
          </div>

          {/* Terminal window body */}
          <div className="bg-terminalPanel shadow-neon rounded-b-lg p-6 border-l border-r border-b border-gray-800">
            <p className="text-center mb-8 text-gray-400 border-b border-gray-700 pb-4">
              Ring signatures with Nostr keys –{" "}
              <span className="text-neonBlue glow-text-blue">
                anonymous cryptographic proof
              </span>
            </p>

            <div className="md:flex md:space-x-6">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <UserList
                  users={userKeys}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelectUser}
                  onKeyChange={handleKeyChange}
                  onRegenerate={handleRegenerateAll}
                />
              </div>
              <div className="md:w-2/3 md:border-l border-gray-700 md:pl-6">
                <SignVerifyPanel
                  message={message}
                  onMessageChange={setMessage}
                  selectedUser={userKeys[selectedIndex]}
                  onSign={handleSign}
                  onVerify={handleVerify}
                  signature={signature}
                  verifyResult={verifyResult}
                />

                <RingSignatureDemo />
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-700 text-xs text-gray-500 text-center terminal-cursor">
              Terminal: NostRinger v1.0 – Prove membership without revealing
              identity
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
