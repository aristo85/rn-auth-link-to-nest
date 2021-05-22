import { useMemo } from "react";
import strings from ".";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";

const useTranslation = () => {
  const langKey = useReduxSelector((state) => state.env.language);
  return useMemo(() => strings[langKey], [langKey]);
};

export default useTranslation;
