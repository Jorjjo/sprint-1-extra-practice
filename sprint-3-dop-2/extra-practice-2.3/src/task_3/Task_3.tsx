import { ChangeEvent, useState } from 'react';
import { SlowComponent } from './slowComponent/SlowComponent';

//-----------with composition-----------
// export const Task_3 = () => {
//     return (
//         <div>
//             <div>Лагает когда изменяется value</div>
//             <InputWithState />
//             <SlowComponent />
//         </div>
//     );
// };

// const InputWithState = () => {
//     const [value, setValue] = useState('');

//     const onChange = (event: ChangeEvent<HTMLInputElement>) =>
//         setValue(event.currentTarget.value);
//     return <input type='text' value={value} onChange={onChange} />;
// };

//--------------with memo-------------
// export const Task_3 = () => {
//   const [value, setValue] = useState('');

//   const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

//   return (
//     <div>
//       <div>Лагает когда изменяется value</div>
//       <input type="text" value={value} onChange={onChange} />
//       <SlowComponent />
//     </div>
//   );
// };

export const Task_3 = () => {
  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

  return (
    <div>
      <div>Лагает когда изменяется value</div>
      <input type="text" value={value} onChange={onChange} />
      <SlowComponent />
    </div>
  );
};