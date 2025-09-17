import { useCallback, useEffect } from "react";
import Branch, { BranchSubscriptionEvent } from "react-native-branch";

type BranchUnsubscribe = () => void;

export const useInitializeBranch = () => {
  // Do not use the hook useNavigation since this hook before the navigation is ready.

  const handleBranchEvent = useCallback(
    (event: BranchSubscriptionEvent) => {
      console.log("Branch deep link subscription event", JSON.stringify(event));
      const { error, params } = event;
      if (error || !params) {
        console.error("Error from Branch deep link subscription", error);
        return;
      }
    },
    []
  );

  useEffect(() => {
    let branchUnsubscribe: BranchUnsubscribe | undefined;

    
    branchUnsubscribe = Branch.subscribe({
      onOpenComplete: handleBranchEvent,
    });

    return () => {
      branchUnsubscribe?.();
    };
  }, [handleBranchEvent]);

  return null;
};

/*
Sample Branch deep link data structure:

{
  "randomized_bundle_token": "427469360685348303",
  "link": "https://example.app.link?%24randomized_bundle_token=427469360685348303",
  "session_id": "429691081177874743",
  "data": {
    "$canonical_identifier": "item/1503684554354.28",
    "$canonical_url": "https://example.com/home?utm_campaign=test&deeplink=value",
    "$desktop_url": "http://example.com/home",
    "$randomized_bundle_token": "427469360685348303",
    "$og_description": "My Content Description",
    "$og_image_url": "http://lorempixel.com/200/200/",
    "$og_title": "46D6D28E-0390-40E4-A856-BD74F34D24C8",
    "$publicly_indexable": 1,
    "+click_timestamp": 1503684563,
    "+clicked_branch_link": true,
    "+is_first_session": false,
    "+match_guaranteed": true,
    "custom": "blue",
    "random": "FE848A5B-78F7-42EC-A253-9F795FE91692",
    "added": "1503684554354.33",
    "~campaign": "new launch",
    "~channel": "facebook",
    "~creation_source": 3,
    "~feature": "sharing",
    "~id": 429691043152332059,
    "~referring_link": "https://example.app.link/X7OsnWv9TF",
    "~stage": "new person",
    "~tags": [
      "one",
      "two"
    ]
  }
}
*/
