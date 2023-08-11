import { useState, useEffect } from 'react';

/**
 * @description: h5端组件监听页面滚动
 * @param {Function} func 滚动回调
 */
export function usePageScrollH5(func: Function) {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);
  useEffect(() => {
    func?.({ scrollTop });
  }, [scrollTop]);
  // 监听页面滚动
  const handleScroll = res => {
    const _scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || res.target.scrollTop;
    setScrollTop(_scrollTop || 0);
  };
}
