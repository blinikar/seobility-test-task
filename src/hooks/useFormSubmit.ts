import { useState } from "react";
import { stringifyForm } from "utils/utils";

interface ResponseData {
  status: "error" | "success"
  message: string;
}

export const useFormSubmit = ():[
  message: string,
  isSubmitting: boolean,
  successFlag: boolean,
  ajaxCall: (values: { [id: string]: string }) => void,
  resetFlag: () => void
] => {
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successFlag, setSuccessFlag] = useState<boolean>(false);

  const ajaxCall = (values: { [id: string]: string }) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText) as ResponseData;
        setMessage(data.message);

        if (data.status === "success") setSuccessFlag(true);
        setIsSubmitting(false);
      }
    };
    xhttp.open("GET", "/response.json?" + stringifyForm(values), true);
    xhttp.send();
    setIsSubmitting(true);
  }

  const resetFlag = () => {
    setSuccessFlag(false);
  }

  return [message, isSubmitting, successFlag, ajaxCall, resetFlag];
}
