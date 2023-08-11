import { useState } from 'react';
import { useDebounceFn } from '@/hooks/common';

/**
 * @description: 判断当前页面或者组件是否正在滚动
 */
function useIsScroll() {
  // 是否正在滚动
  const [isScroll, setScroll] = useState(false);

  // 页面滚动节流
  const pageScrollDebounce = useDebounceFn(() => {
    // 页面滚动时，组件向右移动隐藏，停止滚动时还原
    setScroll(false);
  }, 500);

  // 页面滚动
  const onIsScrollCallBack = () => {
    if (!isScroll) {
      setScroll(true);
    }
    pageScrollDebounce();
  };

  return [isScroll, onIsScrollCallBack] as const;
}

export default useIsScroll;
