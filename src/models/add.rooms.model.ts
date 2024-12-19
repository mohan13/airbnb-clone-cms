import * as Yup from 'yup';

export const RoomsFormSchema = Yup.object().shape({
  title: Yup.string().required('Rquired'),
  roomDescription: Yup.string().required('Rquired'),
  roomType: Yup.string().required('Rquired'),
  price_per_night: Yup.string().required('Rquired'),
  roomImages: Yup.mixed(),
});

export type RoomFormType = Yup.InferType<typeof RoomsFormSchema>;

export const RoomFormInitialValues: RoomFormType = {
  title: '',
  roomDescription: '',
  roomType: '',

  price_per_night: '',

  roomImages: undefined,
};

export const RoomFormFields = [
  {
    fieldId: 'title',
    type: 'input',
    label: 'Hotels Name',
    required: true,
  },

  {
    fieldId: 'roomDescription',
    type: 'text',
    label: 'Room Description',
    placeholder: 'Eg: Apple Inc ...',
    required: true,
  },

  {
    fieldId: 'RoomType',
    type: 'text',
    label: 'Eg: Cottage ...',
    required: true,
  },
  {
    location: [
      {
        fieldId: 'address',
        type: 'text',
        label: 'Address',
        required: true,
      },
      {
        fieldId: 'country',
        type: 'text',
        label: 'Country',
        required: true,
      },
    ],
  },
  {
    fieldId: 'price_per_night',
    type: 'number',
    label: 'Price/Night',
    required: true,
  },
  {
    fieldId: 'roomImages',
    type: 'singleimage',
    label: 'Image',
    required: true,
  },
];
