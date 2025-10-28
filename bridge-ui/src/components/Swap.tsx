import React, { useEffect, useState } from "react";
import { useAssetsStore, type AssetOption } from "../store/assetsStore";
import { motion } from "framer-motion";
import { AssetDropdown } from "./AssetDropdown";
import SlideToConfirmButton from "./SlideToConfirmButton";
import { createOrder } from "../services/orderService";
import { useBitcoinWallet } from "@gardenfi/wallet-connectors";
import { useEVMWallet } from "../hooks/useEVMWallet";
import toprectangle from "../assets/toprectangle.png";
import bottomrectangle from "../assets/bottomrectangle.png";

interface SwapProps {
  onOrderCreated: (orderId: string) => void;
}

const Swap: React.FC<SwapProps> = ({ onOrderCreated }) => {
  const {
    fromAsset,
    toAsset,
    sendAmount,
    receiveAmount,
    isLoading,
    isQuoteLoading,
    fetchAssets,
    setFromAsset,
    setToAsset,
    setSendAmount,
    swapAssets,
    setShowHero,
  } = useAssetsStore();

  const [isOrderCreating, setIsOrderCreating] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState<"from" | "to" | null>(
    null
  );
  const { account: btcAddress } = useBitcoinWallet();
  const { address: evmAddress } = useEVMWallet();
  useEffect(() => {
    fetchAssets();
    setShowHero(true);
  }, [fetchAssets]);

  const handleAssetSelect = (asset: AssetOption, type: "from" | "to") => {
    if (type === "from") {
      setFromAsset(asset);
    } else {
      setToAsset(asset);
    }
    setIsDropdownOpen(null);
  };

  // Show loading state after order creation
  if (isOrderCreating) {
    return (
      <div className="mx-auto p-6 w-[40%]">
        <div className="relative w-full flex items-center flex-col rounded-3xl p-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-2 border-[#e84142] border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Creating Your Order
              </h3>
              <p className="text-gray-600">
                Please wait while we create your cross-chain swap order...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 max-w-xl w-full">
      <div className=" relative w-full flex items-center flex-col rounded-3xl p-6">
        {/* <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-red-700 text-sm">{error}</span>
                <button
                  onClick={clearError}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* From Asset */}
        <div className="w-full ">
          <img
            src={toprectangle}
            alt="toprectangle"
            className="w-full h-10 -mb-1"
          />
          <div className="bg-white mb-2 w-full rounded-b-[30px] border-b border-x border-gray-100 p-6">
            <label className="block caveat text-2xl font-medium text-gray-700 mb-2">
              You Pay 
            </label>
            <div className="w-full justify-between gap-2 flex items-center">

            <AssetDropdown
              type="from"
              selectedAsset={fromAsset}
              isOpen={isDropdownOpen === "from"}
              onToggle={() =>
                setIsDropdownOpen(isDropdownOpen === "from" ? null : "from")
              }
              onSelect={(asset) => handleAssetSelect(asset, "from")}
            />
            <div className="relative w-full">
              <input
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                placeholder="0.0"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e84142]/70 focus:border-transparent"
                disabled={!fromAsset}
                autoComplete="off"
              />
              {isQuoteLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            </div>

          </div>
        </div>

        <div className="flex -my-2 top-48 w-full items-center absolute justify-center ">
          <motion.button
            whileHover={{ scale: 1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            onClick={swapAssets}
            transition={{ duration: 0.2, ease: "linear" }}
            disabled={!fromAsset || !toAsset}
            className="p-2 rounded-full bg-[#e84142] cursor-pointer hover:bg-[#e84142]/90 text-white transition-colors duration-200"
            title="Connect another wallet"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </motion.button>
        </div>

        {/* To Asset */}
        <div className="w-full mb-4 ">
          <div className="bg-white  w-full rounded-t-[30px] border-t border-x border-gray-100 p-6">
            <label className="block caveat text-2xl font-medium text-gray-700 mb-2">
              You Recieve
            </label>
            <div className="w-full flex items-center justify-between gap-2">

            <AssetDropdown
              type="to"
              selectedAsset={toAsset}
              isOpen={isDropdownOpen === "to"}
              onToggle={() =>
                setIsDropdownOpen(isDropdownOpen === "to" ? null : "to")
              }
              onSelect={(asset) => handleAssetSelect(asset, "to")}
            />
            <div className="relative w-full">
              <input
                type="number"
                placeholder="0.0"
                value={receiveAmount}
                readOnly
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none"
                disabled={!toAsset}
              />
              {isQuoteLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            </div>

          </div>
          <img
            src={bottomrectangle}
            alt="toprectangle"
            className="w-full h-10 -mt-1"
          />
        </div>
        {/* Bridge Button */}
        <SlideToConfirmButton
          disabled={
            !fromAsset ||
            !toAsset ||
            !sendAmount ||
            isLoading ||
            isQuoteLoading ||
            isOrderCreating ||
            !btcAddress ||
            !evmAddress
          }
          isLoading={isOrderCreating}
          loadingText={
            isLoading 
              ? "Loading Assets..." 
              : isQuoteLoading 
              ? "Getting Quote..." 
              : "Creating Order..."
          }
          confirmText={!btcAddress || !evmAddress ? "Connect wallet" : "Create Order"}
          onConfirm={async () => {
            try {
              setIsOrderCreating(true);
              const result = await createOrder({
                btcAddress: btcAddress || "",
                evmAddress: evmAddress || "",
                fromAsset: fromAsset!,
                toAsset: toAsset!,
                sendAmount: sendAmount || "",
                receiveAmount: receiveAmount || "",
              });

              if (result.status === "ok" && result.result) {
                // Call the callback to open the modal instead of showing OrderDetails directly
                onOrderCreated(result.result);
              } else {
                console.error("Failed to create order:", result);
              }
            } catch (error) {
              console.error("Failed to create order:", error);
            } finally {
              setIsOrderCreating(false);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Swap;
