'use client';

import { useState } from 'react';

interface Props {
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const AppInput: React.FC<Props> = ({
  value,
  onChange,
  error,
  onFocus,
  onBlur,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="title-input"
        className={focus ? 'text-cyan-300/75' : 'text-slate-400'}
      >
        Title
      </label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        name="title"
        id="title-input"
        className={`rounded-lg shadow-sm shadow-slate-500 px-3 py-2 bg-slate-600 border-none outline-none ${
          error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-cyan-300'
        }`}
        onFocus={(e) => {
          setFocus(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          onBlur?.(e);
        }}
      />
      {error ? (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      ) : null}
    </div>
  );
};

export default AppInput;
