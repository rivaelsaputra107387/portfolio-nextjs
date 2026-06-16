"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppCTA() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  // Don't show WhatsApp button on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;

    // Show tooltip after 4 seconds of page load
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [pathname, isAdminRoute]);

  if (isAdminRoute) return null;

  const waNumber = "6285794946920";
  const waText = encodeURIComponent("Halo Rivael, saya tertarik untuk berdiskusi tentang pembuatan website / proyek.");
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Tooltip Message */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto bg-[#1A1A1A] border border-surface-border text-white text-[11px] md:text-xs px-3.5 py-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2 max-w-[240px]"
          >
            <span className="flex-1 leading-relaxed">
              👋 Halo! Butuh jasa website atau ada pertanyaan? Yuk ngobrol!
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-muted hover:text-white transition-colors p-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-300 relative"
        title="Hubungi via WhatsApp"
      >
        {/* Official WhatsApp Icon */}
        <svg
          className="w-7 h-7 md:w-8 md:h-8 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.452L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.419 1.451 5.428 0 9.845-4.417 9.849-9.847.002-2.63-1.02-5.101-2.871-6.955C17.191 1.95 14.724.93 12.005.93c-5.43 0-9.848 4.418-9.853 9.848-.001 1.916.5 3.791 1.45 5.392l-1.018 3.719 3.812-.999zm11.233-6.529c-.27-.135-1.597-.788-1.845-.877-.247-.09-.427-.135-.607.135-.18.27-.697.877-.855 1.057-.157.18-.315.203-.585.068-2.617-1.306-4.22-2.732-5.127-4.293-.24-.413-.024-.637.211-.872.212-.212.472-.54.708-.81.237-.27.315-.45.473-.765.157-.315.078-.59-.039-.817-.117-.228-.962-2.316-1.317-3.172-.345-.833-.695-.72-1.012-.736-.26-.013-.56-.016-.86-.016-.3 0-.788.112-1.198.562-.41.45-1.565 1.53-1.565 3.73 0 2.2 1.6 4.322 1.82 4.622.227.3 3.149 4.808 7.629 6.742 1.066.46 1.899.736 2.55.942 1.07.34 2.042.293 2.812.177.859-.129 2.628-1.074 3.002-2.112.375-1.039.375-1.931.263-2.112-.113-.18-.316-.27-.586-.405z" />
        </svg>
      </a>
    </div>
  );
}
