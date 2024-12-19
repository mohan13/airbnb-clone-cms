import { Form, Formik } from 'formik';
import React from 'react';
import {
  RoomFormFields,
  RoomFormInitialValues,
  RoomFormType,
  RoomsFormSchema,
} from '../../../models/add.rooms.model';
import { submitPost, updatePost } from '../../../action/crud-action';
import { cn } from '../../../utils/utils';
import { Input } from '../../../components/Forms/Input';
import { UploadImage } from '../../../components/Forms/upload-images';
import { MoonLoader } from 'react-spinners';
type PropsType = {
  currentData?: any;
};

export const PostRooms = ({ currentData }: PropsType) => {
  return (
    <div className="rounded-xl space-y-4 mt-4">
      <Formik
        initialValues={(currentData as RoomFormType) || RoomFormInitialValues}
        validationSchema={RoomsFormSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const filteredValues = await RoomsFormSchema.validate(values, {
            stripUnknown: true,
          });

          const formData = new FormData();
          Object.keys(filteredValues).map((key: string) => {
            return formData.append(
              key,
              filteredValues[key as keyof typeof filteredValues],
            );
          });

          console.log('room', formData);
          if (currentData) {
            const response = await updatePost(
              formData,
              setSubmitting,
              `/rooms/${currentData.id}`,
            );
            if (response) {
              resetForm();
            }
          } else {
            const response = await submitPost(
              formData,
              setSubmitting,
              '/rooms',
            );
            if (response) {
              resetForm();
            }
          }
        }}
      >
        {({ values, setFieldValue, handleChange, isSubmitting }) => (
          <Form className="pb-6 bg-white">
            <section className="form-wrapper mb-10">
              {RoomFormFields.map((data) => {
                return (
                  <div
                    key={data.fieldId}
                    className={cn(
                      'form-item',
                      data.type === 'singleimage' && 'col-span-6',
                    )}
                  >
                    {data.type === 'singleimage' ? (
                      <UploadImage
                        setFieldValue={setFieldValue}
                        values={values}
                        fieldId={data.fieldId}
                        handleChange={handleChange}
                      />
                    ) : (
                      <Input
                        label=""
                        className="form-input"
                        name={data.fieldId}
                        placeholder={data.placeholder}
                      />
                    )}
                  </div>
                );
              })}
            </section>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {' '}
              {isSubmitting ? <MoonLoader color="#fff" size={16} /> : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
