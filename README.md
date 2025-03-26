# 🔐 NostRinger

![NostRinger](./public/nostringer-preview.png)

## Anonymous Ring Signatures with Nostr Keys

NostRinger is a sleek, terminal-themed web application that demonstrates the power of ring signatures using Nostr cryptographic keys. Ring signatures allow a user to sign a message on behalf of a group without revealing exactly which member signed it—providing cryptographic anonymity while ensuring verifiable authenticity.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnostringer-app)

## 🌟 Features

- **Generate Cryptographic Key Pairs** - Create 5 ring member keys and 2 normal user keys automatically
- **Persistent Storage** - Keys are saved in localStorage for session persistence
- **Edit Keys Manually** - Modify secret keys with public key auto-derivation
- **Sign Messages** - Produce ring signatures with any selected user's key
- **Verify Signatures** - Validate signatures against the ring of public keys
- **Terminal UI** - Enjoy a sleek, cyberpunk-inspired terminal interface

## 🧪 How It Works

1. **Key Generation**: The app generates 7 Nostr key pairs—5 "ring members" and 2 "normal users"
2. **Message Signing**: Select any user and sign a custom message
3. **Ring Signature**: When a ring member signs, the signature verifies against the ring without revealing which member signed it
4. **Verification**: Confirm that the message was signed by *someone* in the ring, but not *who specifically*

## 🚀 Try It Yourself

### Ring Signature Demonstration

1. Enter a message in the input field
2. Select a ring member (Ring User 1-5) as the signer
3. Click "Sign" to generate a ring signature
4. Click "Verify" to confirm the signature is valid for the ring

### Privacy Test

1. Sign a message with a ring member
2. Verify it (should PASS)
3. Now sign with a non-ring user
4. Verify again (should FAIL - the signature is not from a ring member)

This proves that verification only confirms group membership, not individual identity.

## 🛠️ Technology Stack

- **Next.js** - React framework with TypeScript
- **TailwindCSS** - Utility-first CSS framework
- **nostr-tools** - Nostr key generation and management
- **nostringer** - Ring signature cryptography library

## 💻 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nostringer-app.git
cd nostringer-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start the production server
npm start
```

## 📚 Learn More

- [What are Ring Signatures?](https://en.wikipedia.org/wiki/Ring_signature)
- [Nostr Protocol](https://github.com/nostr-protocol/nostr)
- [Next.js Documentation](https://nextjs.org/docs)

## 📜 License

Released under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for the privacy-conscious web
</p>
