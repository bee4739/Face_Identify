import React from "react";

const prefixLocalstorage = "myFaceIdentifyDB";

const getValue = (key, initialValue) => {
  const value =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(`${prefixLocalstorage}_${key}`))
      : initialValue;

  if (value) return value;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

const useLocalStorage = (key, initialValue = null) => {
  const [value, setValue] = React.useState(() => getValue(key, initialValue));

  React.useEffect(() => {
    localStorage.setItem(`${prefixLocalstorage}_${key}`, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
