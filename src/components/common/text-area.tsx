'use client';

import { useState } from 'react';

interface Props {
  resize?: 'resize-none' | 'resize-y' | 'resize-x' | 'resize';
  rows?: number;
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const AppTextarea: React.FC<Props> = ({
  resize = 'resize-none',
  rows = 3,
  value,
  onChange,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="description-textarea"
        className={focus ? 'text-cyan-300/75' : 'text-slate-400'}
      >
        Description
      </label>
      <textarea
        value={value}
        onChange={onChange}
        className={`rounded-lg px-3 py-2 shadow-sm shadow-slate-500 bg-slate-600 focus:ring-2 focus:ring-cyan-300 border-none outline-none ${resize}`}
        name="description"
        id="description-textarea"
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default AppTextarea;
