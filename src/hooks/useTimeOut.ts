import { useEffect, useRef } from 'react';

/**
 * @description: 定时器hook，使用该hook返回的定时器，在组件销毁时会自动清除
 * @return {Function} $setTimeout： 定时器方法，与 setTimeout 语法一致
 */
export default function useTimeOut() {
  const timers = useRef<NodeJS.Timeout[]>([]);

  const $setTimeout = (callback: () => void, delay?: number) => {
    const id: NodeJS.Timeout = setTimeout(callback, delay);
    timers.current.push(id);
    return { id, $clearTimeout };
  };

  // 销毁时清除当前组件所有定时器
  useEffect(() => {
    return () => {
      timers.current.forEach(id => clearTimeout(id));
    };
  }, []);

  // 手动清除当前组件所有定时器
  const $clearTimeout = () => {
    timers.current.forEach(id => clearTimeout(id));
  };

  return $setTimeout;
}
