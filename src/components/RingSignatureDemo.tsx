import { useState } from "react";
import { NostrTools } from "../lib/NostrTools";
import { sign, verify } from "nostringer";

interface RingSignature {
  c0: string;
  s: string[];
}

export default function RingSignatureDemo() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  async function runRingSignatureDemo() {
    setOutput([]);
    setIsRunning(true);

    addLine("Ring Signature Demo using nostringer with nostr-tools keys");
    addLine("------------------------------------------------------");

    // Generate two Nostr keypairs
    const keyPairs = NostrTools.generateKeyPairs(2);
    addLine(`Generated ${keyPairs.length} key pairs`);

    // Create a ring with public keys
    const ring = NostrTools.getPublicKeys(keyPairs);
    addLine("Ring of public keys:");
    addLine(JSON.stringify(ring.map((pk) => pk.substring(0, 10) + "...")));

    const message = "Hello, this is a ring signature example!";
    addLine(`Message to sign: "${message}"`);

    try {
      // Sign with the first private key
      addLine("\nSigning with the first private key...");
      const signature = (await sign(
        message,
        keyPairs[0].privateKeyHex,
        ring,
      )) as RingSignature;
      addLine("Signature created:");
      addLine(
        JSON.stringify(
          {
            c0: signature.c0.substring(0, 10) + "...",
            s: signature.s.map((s) => s.substring(0, 10) + "..."),
          },
          null,
          2,
        ),
      );

      // Verify the signature
      addLine("\nVerifying signature...");
      const isValid = await verify(signature, message, ring);
      addLine("Signature valid: " + isValid);

      // Try with a tampered message
      const tamperedMessage = "Tampered message";
      addLine("\nVerifying with tampered message...");
      const isTamperedValid = await verify(signature, tamperedMessage, ring);
      addLine("Signature valid with tampered message: " + isTamperedValid);
    } catch (error) {
      addLine(
        "Error during demo: " +
          (error instanceof Error ? error.message : String(error)),
      );
    }

    setIsRunning(false);
  }

  function addLine(text: string) {
    setOutput((prev) => [...prev, text]);
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <h3 className="text-lg text-neonBlue mb-4">Ring Signature Demo</h3>

      <button
        onClick={runRingSignatureDemo}
        disabled={isRunning}
        className="px-4 py-2 bg-gray-800 text-neonGreen border border-gray-700 rounded-md hover:bg-gray-700 transition-colors duration-150 mb-4 disabled:opacity-50"
      >
        {isRunning ? "Running Demo..." : "Run Demo"}
      </button>

      {output.length > 0 && (
        <pre className="font-mono text-xs bg-black bg-opacity-70 p-4 rounded-md border border-gray-700 overflow-x-auto whitespace-pre-wrap">
          {output.map((line, i) => (
            <div
              key={i}
              className={line.startsWith("Error") ? "text-neonRed" : ""}
            >
              {line}
            </div>
          ))}
        </pre>
      )}
    </div>
  );
}
