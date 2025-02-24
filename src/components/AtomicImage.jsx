import React, { useState, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AtomicImage Component
 *
 * Renders an image using the <picture> element for responsive image loading.
 * Implements progressive loading with a blurred skeleton placeholder,
 * supports responsive attributes (srcSet, sizes), and handles errors robustly.
 *
 * @param {Object} props
 * @param {string} props.src - Primary image URL.
 * @param {string} props.alt - Alternate text for the image.
 * @param {string} [props.placeholderSrc] - URL of a low-resolution placeholder image.
 * @param {string} [props.errorSrc] - URL of a fallback image if the main image fails to load.
 * @param {string} [props.srcSet] - Comma-separated list of image sources for different resolutions.
 * @param {string} [props.sizes] - Image sizes attribute for responsive image selection.
 * @param {Function} [props.onClick] - Optional click event handler.
 * @param {string} [props.className=""] - Additional CSS classes.
 */
const AtomicImage = ({
  src,
  alt,
  onClick,
  className = "",
  placeholderSrc,
  errorSrc,
  srcSet,
  sizes,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleLoad = () => setLoaded(true);
  const handleError = () => setHasError(true);

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {/* Blurred skeleton placeholder */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-full h-full animate-pulse bg-gray-300" />
        </div>
      )}
      {hasError ? (
        <img
          src={errorSrc || placeholderSrc || "/fallback-image.png"}
          alt="Fallback"
          className="w-full h-full object-cover"
        />
      ) : (
        <picture>
          {srcSet && <source srcSet={srcSet} sizes={sizes} />}
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default memo(AtomicImage);
