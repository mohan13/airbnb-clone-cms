import React, { forwardRef } from 'react';
import { cn } from '../../utils/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, type = 'text', ...props }, ref) => {
    return (
      <div>
        <div className="mb-3 block text-black dark:text-white">{label}</div>
        <input
          type={type}
          ref={ref}
          {...props}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
