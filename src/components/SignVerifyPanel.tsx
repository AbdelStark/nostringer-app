import { UserKey } from "./UserList";

interface SignVerifyProps {
  message: string;
  onMessageChange: (msg: string) => void;
  selectedUser: UserKey | undefined;
  onSign: () => void;
  onVerify: () => void;
  signature: string | null;
  verifyResult: boolean | null;
}

export default function SignVerifyPanel({
  message,
  onMessageChange,
  selectedUser,
  onSign,
  onVerify,
  signature,
  verifyResult,
}: SignVerifyProps) {
  const formatSig = (sig: string): string => {
    if (!sig) return "";
    if (sig.startsWith("{")) {
      // This is a stringified object
      return "[Signature Object]";
    }
    // This is a regular string
    return sig.length > 32 ? sig.slice(0, 16) + "..." + sig.slice(-16) : sig;
  };

  return (
    <div className="terminal-console">
      <h2 className="text-xl text-neonBlue glow-text-blue mb-6 border-b border-gray-700 pb-2">
        Sign & Verify
      </h2>

      <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2 font-bold">
          Message to sign:
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="w-full bg-black bg-opacity-70 text-neonYellow p-3 rounded-md border border-gray-700 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue font-mono"
          placeholder="Type your message here..."
        />
      </div>

      {selectedUser && (
        <div className="mb-6 p-3 bg-gray-800 bg-opacity-50 rounded-md border-l-2 border-neonBlue">
          <p className="text-sm text-gray-400">
            Selected signer:{" "}
            <span className="text-neonGreen font-bold glow-text">
              {selectedUser.label}
            </span>
            {selectedUser.inRing ? (
              ""
            ) : (
              <span className="text-neonYellow glow-text-yellow">
                {" "}
                (not in ring)
              </span>
            )}
          </p>
        </div>
      )}

      <div className="mb-6 flex space-x-4">
        <button
          onClick={onSign}
          className="px-5 py-3 bg-gray-800 text-neonGreen border border-gray-700 rounded-md hover:bg-gray-700 transition-colors duration-150 font-bold flex-1 hover:glow-text"
        >
          Sign
        </button>
        <button
          onClick={onVerify}
          className="px-5 py-3 bg-gray-800 text-neonBlue border border-gray-700 rounded-md hover:bg-gray-700 transition-colors duration-150 font-bold flex-1 disabled:opacity-50 disabled:cursor-not-allowed hover:glow-text-blue"
          disabled={!signature}
        >
          Verify
        </button>
      </div>

      <div className="text-sm whitespace-pre-wrap p-4 bg-black bg-opacity-50 rounded-md border border-gray-700 min-h-32">
        {signature && verifyResult === null && (
          <div className="text-gray-300 mb-3 font-mono">
            <span className="text-neonBlue font-bold">$</span> Signature:{" "}
            <span className="text-neonGreen">{formatSig(signature)}</span>
          </div>
        )}
        {verifyResult !== null && (
          <div className="font-mono">
            <span className="text-neonBlue font-bold">$</span> Verification:{" "}
            {verifyResult ? (
              <span className="text-neonGreen font-bold glow-text crt-flicker">
                ✅ PASSED
              </span>
            ) : (
              <span className="text-neonRed font-bold glow-text-red crt-flicker">
                ❌ FAILED
              </span>
            )}
            <div className="mt-2 text-gray-300">
              {verifyResult
                ? "Message was signed by a member of the ring."
                : "Signature is not from the defined ring."}
            </div>
          </div>
        )}
        {!signature && !verifyResult && (
          <div className="text-gray-500 italic terminal-cursor">
            Terminal output will appear here...
          </div>
        )}
      </div>
    </div>
  );
}
