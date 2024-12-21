// import { Form, Formik } from 'formik';
// import React from 'react';
// import {
//   RoomFormFields,
//   RoomFormInitialValues,
//   RoomFormType,
//   RoomsFormSchema,
// } from '../../../models/add.rooms.model';
// import { submitPost, updatePost } from '../../../action/crud-action';
// import { cn } from '../../../utils/utils';
// import { Input } from '../../../components/Forms/Input';
// import { UploadImage } from '../../../components/Forms/upload-images';
// import { MoonLoader } from 'react-spinners';
// type PropsType = {
//   currentData?: any;
// };

// export const PostRooms = ({ currentData }: PropsType) => {
//   return (
//     <div className="rounded-xl space-y-4 mt-4">
//       <Formik
//         initialValues={(currentData as RoomFormType) || RoomFormInitialValues}
//         validationSchema={RoomsFormSchema}
//         onSubmit={async (values, { setSubmitting, resetForm }) => {
//           const filteredValues = await RoomsFormSchema.validate(values, {
//             stripUnknown: true,
//           });

//           const formData = new FormData();
//           Object.keys(filteredValues).map((key: string) => {
//             return formData.append(
//               key,
//               filteredValues[key as keyof typeof filteredValues],
//             );
//           });

//           console.log('room', formData);
//           if (currentData) {
//             const response = await updatePost(
//               formData,
//               setSubmitting,
//               `/rooms/${currentData.id}`,
//             );
//             if (response) {
//               resetForm();
//             }
//           } else {
//             const response = await submitPost(
//               formData,
//               setSubmitting,
//               '/rooms',
//             );
//             if (response) {
//               resetForm();
//             }
//           }
//         }}
//       >
//         {({ values, setFieldValue, handleChange, isSubmitting }) => (
//           <Form className="pb-6 bg-white">
//             <section className="form-wrapper mb-10">
//               {RoomFormFields.map((data) => {
//                 return (
//                   <div
//                     key={data.fieldId}
//                     className={cn(
//                       'form-item',
//                       data.type === 'singleimage' && 'col-span-6',
//                     )}
//                   >
//                     {data.type === 'singleimage' ? (
//                       <UploadImage
//                         setFieldValue={setFieldValue}
//                         values={values}
//                         fieldId={data.fieldId}
//                         handleChange={handleChange}
//                       />
//                     ) : (
//                       <Input
//                         label=""
//                         className="form-input"
//                         name={data.fieldId}
//                         placeholder={data.placeholder}
//                       />
//                     )}
//                   </div>
//                 );
//               })}
//             </section>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
//             >
//               {' '}
//               {isSubmitting ? <MoonLoader color="#fff" size={16} /> : 'Submit'}
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

import { useForm } from 'react-hook-form';
import { Input } from '../Input';
import { MoonLoader } from 'react-spinners';
import { submitPost, updatePost } from '../../../action/crud-action';
import { Rooms } from '../../../types/room';
import { useState } from 'react';

type RoomFormProps = {
  currentData?: Rooms;
};

export const PostRooms = ({ currentData }: RoomFormProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Rooms>({
    defaultValues: currentData
      ? {
          title: currentData.title,
          roomDescription: currentData.roomDescription,
          roomType: currentData.roomType,
          price_per_night: currentData.price_per_night,
          currency: currentData.currency,
          location: { ...currentData.location },
          amenities: currentData.amenities,
          availability: { ...currentData.availability },
        }
      : {},
  });

  const onSubmit = async (data: Rooms) => {
    // Prepare data to mimic Postman form-data
    console.log('data', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('roomDescription', data.roomDescription);
    formData.append('roomType', data.roomType);
    formData.append('price_per_night', String(data.price_per_night));
    formData.append('currency', data.currency);

    // Add location as JSON string
    formData.append(
      'location',
      JSON.stringify({
        address: data.location.address,
        city: data.location.city,
        state: data.location.state,
        country: data.location.country,
      }),
    );

    formData.append(
      'availability',
      JSON.stringify({
        start_date: data.availability.start_date,
        end_date: data.availability.end_date,
        is_available: data.availability.is_available,
      }),
    );

    // Add amenities as JSON string
    formData.append('amenities', JSON.stringify(data.amenities));

    // Add images
    Array.from(data.roomImages).forEach((image) => {
      formData.append('roomImages', image);
    });

    try {
      if (currentData) {
        await updatePost(formData, `/rooms/${currentData.id}`);
        reset(); // Clear the form
      } else {
        await submitPost(formData, '/rooms');
        reset(); // Clear the form
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-2">
      <div className="col-span-4">
        <Input
          label="Title"
          {...register('title', { required: true })}
          placeholder="Enter your title"
        />
      </div>
      <textarea
        defaultValue={currentData ? currentData.roomDescription : undefined}
        {...register('roomDescription', { required: true })}
        placeholder="Description"
        className="w-full col-span-4 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <div className="col-span-2">
        <Input
          label="Room type"
          {...register('roomType', { required: true })}
          placeholder="Type"
        />
      </div>
      <Input
        label="Price Per/Night"
        type="number"
        {...register('price_per_night', { required: true })}
        placeholder="Price per night"
      />
      <div>
        <div className="mb-3 block text-black dark:text-white">Currency</div>

        <select
          defaultValue={currentData?.currency ?? undefined}
          {...register('currency', { required: true })}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="USD">USD</option>
          <option value="Rs.">Rs.</option>
          <option value="Deram">Deram</option>
        </select>
      </div>

      <h3 className="col-span-4">Location</h3>
      <Input
        label="Address"
        {...register('location.address', { required: true })}
        placeholder="Address"
      />
      <Input
        label="City"
        {...register('location.city', { required: true })}
        placeholder="City"
      />
      <Input
        label="State"
        {...register('location.state', { required: true })}
        placeholder="State"
      />
      <Input
        label="Country"
        {...register('location.country', { required: true })}
        placeholder="Country"
      />

      <h3 className="col-span-4">Availability</h3>

      <Input
        label="Start Date"
        type="date"
        {...register('availability.start_date', { required: true })}
        placeholder="Address"
      />
      <Input
        label="End Date"
        type="date"
        {...register('availability.end_date', { required: true })}
        placeholder="City"
      />

      <Input
        label="Is Available"
        type="checkbox"
        {...register('availability.is_available', { required: true })}
        placeholder="State"
      />

      <h3 className="col-span-4">Amenities</h3>
      <select
        className="col-span-4 grid grid-cols-3 "
        defaultValue={currentData ? currentData.amenities : undefined}
        {...register('amenities')}
        multiple
      >
        <option value="WiFi">WiFi</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Air Conditioning">Air Conditioning</option>
        <option value="Parking">Parking</option>
      </select>

      <div>
        <h3>Images</h3>
        <input
          type="file"
          {...register('roomImages', { required: true })}
          multiple
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        className="flex col-span-4  w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
      >
        {isSubmitting ? <MoonLoader color="#fff" size={16} /> : 'Submit'}
      </button>
    </form>
  );
};
