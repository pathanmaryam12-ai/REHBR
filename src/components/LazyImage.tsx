import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderColor?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderColor = 'bg-oat/20',
  loading = 'eager',
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasFailedOnce(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If /images/... path fails, try without /images/ prefix and vice versa
    if (!hasFailedOnce) {
      setHasFailedOnce(true);
      if (currentSrc.startsWith('/images/')) {
        setCurrentSrc(currentSrc.replace('/images/', '/'));
      } else if (!currentSrc.startsWith('/images/') && !currentSrc.startsWith('http') && !currentSrc.startsWith('data:')) {
        setCurrentSrc(`/images/${currentSrc.replace(/^\//, '')}`);
      }
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className={`relative overflow-hidden ${placeholderColor} ${containerClassName}`}>
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={handleError}
        onLoad={onLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 opacity-100 ${className}`}
        style={style}
        {...props}
      />
    </div>
  );
};

export default LazyImage;

