import { FormFieldWrapperProps } from "components/FormFieldWrapper";
import React, { FormEvent } from "react";
import styles from "./MyFormField.module.css";

interface MyFormFieldProps {
  value: string;
  error: string;
  onInput: (event: FormEvent<HTMLInputElement>) => void;
}

export const MyFormField = (props: MyFormFieldProps & FormFieldWrapperProps) => {
  return <div className={styles["field-block"]}>
    <p>{props.label}</p>
    <input {...props as React.HTMLProps<HTMLInputElement>} />
    <p className={styles["errors"]}>{props.error}</p>
  </div>;
}
