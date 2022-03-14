// @ts-ignore
import React, { useRef, useCallback } from 'react';

export const useHelper = <T extends Record<string, any>>(
  callback: (args: T) => void,
): ((args: T) => void) => {
  const ref = useRef<(args: T) => void>();
  ref.current = callback;

  return useCallback(function () {
    const _callback = ref.current;
    if (typeof _callback === 'function') {
      // @ts-ignore
      return _callback.apply(this, arguments);
    }
  }, []);
};
