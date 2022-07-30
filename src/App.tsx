import React  from 'react';
import styles from "./App.module.css";
import { MyForm } from "components/MyForm";
import { FormFieldWrapper } from "components/FormFieldWrapper";
import { useAppLogic } from "App.logic";

const App = () => {

  const logic = useAppLogic();
  const [values, errors, formState, handleInput, handleSubmit] = logic.useForm({
    "name": "",
    "email": "",
    "birth-date": "",
    "phone": "",
    "message": ""
  });

  return (
    <div className={styles["app"]}>
      <header>
        <h2>Feedback Form</h2>
      </header>
      <main>
        <div className={styles["form"]}>
          <MyForm
            values={values}
            errors={errors}
            formState={formState}

            onFormSubmit={handleSubmit}
            onValueChange={handleInput}
          >
            <FormFieldWrapper
              id={"name"}
              placeholder={"IVAN IVANOV"}
              label={"Name"} />
            <FormFieldWrapper
              id={"email"}
              placeholder={"example@example.com"}
              label={"EMail"} />
            <FormFieldWrapper
              id={"phone"}
              type={"tel"}
              placeholder={"+79999999999"}
              label={"Phone"} />
            <FormFieldWrapper
              id={"birth-date"}
              label={"Birth Date"}
              type={"date"} />
            <FormFieldWrapper
              id={"message"}
              label={"Message"} />
          </MyForm>
        </div>
      </main>
    </div>
  );
}

export default App;
