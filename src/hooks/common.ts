import { useEffect, useRef, useState, useCallback } from 'react';

// 自定义useState，使用同原生useState，可在setXState中传入回调函数
const useCallBackState = initState => {
  const [state, setState] = useState(initState);
  let isUpdate = useRef<Function>();
  const setCallBackState = (stateArg, cb) => {
    setState(prev => {
      isUpdate.current = cb;
      return typeof stateArg === 'function' ? stateArg(prev) : stateArg;
    });
  };
  useEffect(() => {
    if (isUpdate.current) {
      isUpdate.current(state);
      isUpdate.current = undefined;
    }
  });
  return [state, setCallBackState];
};

// 防抖、节流hook类型定义
interface DebounceTemp {
  fn: Function;
  timer: NodeJS.Timeout | null;
}
// 自定义防抖hook
const useDebounceFn = (fn: Function, delay: number, dep: any[] = []) => {
  const { current } = useRef<DebounceTemp>({ fn, timer: null });
  current.fn = fn;

  useEffect(() => {
    return () => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
    };
  }, []);

  return useCallback(
    function (...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.apply(this, args);
      }, delay);
    },
    [dep]
  );
};

// 自定义节流hook
const useThrottleFn = (fn: Function, delay: number, dep: any[] = []) => {
  const { current } = useRef<DebounceTemp>({ fn, timer: null });
  current.fn = fn;

  useEffect(() => {
    return () => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
    };
  }, []);

  return useCallback(
    function (...args) {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          current.timer = null;
        }, delay);
        current.fn.apply(this, args);
      }
    },
    [dep]
  );
};

export { useCallBackState, useDebounceFn, useThrottleFn };
