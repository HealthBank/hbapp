import { useCallback, useEffect } from "react";
import Branch, { BranchSubscriptionEvent } from "react-native-branch";

export const useInitializeBranch = () => {
  const handleBranchEvent = useCallback(
    (event: BranchSubscriptionEvent) => {
      console.log("Branch deep link subscription event", JSON.stringify(event));
      const { error, params } = event;
      if (error || !params) {
        console.error("Error from Branch deep link subscription", error);
        return;
      }
    }, []);

  useEffect(() => {
    const branchUnsubscribe = Branch.subscribe({
      onOpenComplete: handleBranchEvent,
    });
    return () => {
      branchUnsubscribe();
    };
  }, [handleBranchEvent]);

  return null;
};
