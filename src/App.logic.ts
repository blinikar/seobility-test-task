import { useEffect, useState } from "react";
import { checkForNoErrors } from "components/MyForm/FromUtils";
import { useFormSubmit } from "hooks/useFormSubmit";


export const useAppLogic = () => {
  return {
    useForm: (initialValues: { [id: string]: string }): [
      values: { [id: string]: string },
      errors: { [id: string]: string },
      formState: string,
      handleInput: (values: { [id: string]: string }) => void,
      handleSubmit: (values: { [id: string]: string }) => void
    ] => {
      const [values, setValues] = useState<{ [id: string]: string }>(initialValues);
      const [errors, setErrors] = useState<{ [id: string]: string }>({});
      const [formState, setFormState] = useState<string>("");

      const [message, isSubmitting, successFlag, ajaxCall, resetFlag] = useFormSubmit();

      useEffect(() => {
        const newErrors: { [id: string]: string } = {};

        if (values["name"] === "") {
          newErrors["name"] = "Name is Required";
        } else if (!/^[a-zA-Z]{3,30} [a-zA-Z]{3,30}$/i.test(values["name"])) {
          newErrors["name"] = "Invalid Name";
        }

        if (values["email"] === "") {
          newErrors["email"] = "Email is Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values["email"])) {
          newErrors["email"] = "Invalid Email";
        }

        if (values["message"] === "") {
          newErrors["message"] = "Message is Required"
        } else if (!/^[a-zA-Z0-9._% ]{10,300}$/i.test(values["message"])) {
          newErrors["message"] = "Message should be from 10 to 300 symbols long"
        }

        if (values["phone"] === "") {
          newErrors["phone"] = "Phone is Required";
        } else if (!/^\+7\d{10}$/i.test(values["phone"])) {
          newErrors["phone"] = "Phone should be in format +79999999999";
        }

        if (values["birth-date"] == "") {
          newErrors["birth-date"] = "Birth Date is Required";
        }

        setErrors(newErrors);
      }, [values]);

      const handleInput = (newValues: { [id: string]: string }) => {
        newValues["name"] = newValues["name"].toLocaleUpperCase();
        setValues(newValues);
      }

      const handleSubmit = (values: { [id: string]: string }) => {
        if (checkForNoErrors(errors) && !isSubmitting) {
          ajaxCall(values);
          setFormState("Submitting...")
        } else if (!checkForNoErrors(errors)) {
          setFormState("Fix Errors");
        } else if (isSubmitting) {
          setFormState("Please wait until your request will be processed");
        }
      }

      useEffect(() => {
        if (successFlag) {
          setValues(initialValues);
          setFormState(message);
          resetFlag();
        }
      }, [successFlag]);

      return [values, errors, formState, handleInput, handleSubmit];
    }
  }
}
