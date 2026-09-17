import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { actions } from "astro:actions";

import { useState } from "react";
import { QRCode } from "react-qr-code";
import type { Plan } from "../../prisma/generated/enums";

type QRGeneratorProps = {
  userId: string;
  membershipType: (typeof Plan)[keyof typeof Plan];
  expiresAt: number;
  nonce: string;
};

export default function QRGenerator({
  expiresAt,
  membershipType,
  nonce,
  userId,
}: QRGeneratorProps) {
  const [hash, setHash] = useState<string | null>(null);

  const createSecureHash = async () => {
    const { data, error } = await actions.createSecureHash({
      userId,
      expiresAt,
      membershipType,
      nonce,
    });

    const actionHash = data;

    if (!actionHash || error) {
      console.error("Error al generar el hash", error);
      return;
    }

    await actions.notifyNewMessage({ userId });

    setHash(actionHash);
  };

  const QRData = JSON.stringify({
    userId,
    membershipType,
    expiresAt,
    nonce,
    hash,
  });

  return (
    <Dialog>
      <DialogTrigger
        onClick={createSecureHash}
        className="rounded-xl border mt-4 border-rose-400/60 px-6 py-3 text-sm font-bold text-rose-200 transition hover:bg-rose-500/20 hover:text-white"
      >
        Generar QR
      </DialogTrigger>
      <DialogContent className="max-w-sm flex justify-center items-center">
        {hash ? <QRCode value={QRData} /> : <p>Cargando QR...</p>}
      </DialogContent>
    </Dialog>
  );
}
