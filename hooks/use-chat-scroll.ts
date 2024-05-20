import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count
}: ChatScrollProps) => {
  const [hasInitialized, setHadInitialized] = useState(false)

  useEffect(() => {
    const topDiv = chatRef?.current

    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop

      if (scrollTop && scrollTop <= 500 && shouldLoadMore) {
        loadMore()
      }
    }

    topDiv?.addEventListener("scroll", handleScroll)

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll)
    }

  }, [shouldLoadMore, loadMore, chatRef])

  useEffect(() => {
    const bottomDiv = bottomRef?.current

    const topDiv = chatRef.current

    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHadInitialized(true)

        return true
      }

      if (!topDiv) {
        return false
      }

      return true
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView()
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasInitialized])
}