'use client';

import Modal from '../ui/Modal';

interface GeoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  url: string;
}

export default function GeoPopup({ isOpen, onClose, message, url }: GeoPopupProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 sm:p-8 text-center">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber/10 border border-amber/20
          flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        {/* Message */}
        <h3 className="text-text-primary font-semibold text-lg mb-2">
          Location Restriction
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-sm mx-auto">
          {message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
              bg-gradient-to-r from-accent to-emerald text-bg-primary font-semibold text-sm
              hover:shadow-lg hover:shadow-accent/25 transition-all"
          >
            Visit Anyway
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-border-subtle text-text-secondary
              font-semibold text-sm hover:bg-bg-secondary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
