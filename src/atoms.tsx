import { atom, selector } from 'recoil';

export type Category = 'DONE' | 'DOING' | 'TO_DO';

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

// => atom 이 변화면 selector 변함

// export const toDoSelector = selector({
//   key: 'toDoSelecter',
//   get: ({ get }) => {
//     const toDos = get(toDoState);
//     return toDos.length;
//   },
// });

export const categorySelector = selector({
  key: 'categorySelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const selectedCategory = get(categoryState);
    return toDos.filter((toDo) => toDo.category === selectedCategory);
  },
});

// ⭐️ state 자체를 바꾸는게 아니라, output을 바꾸고 있다는 점 인지
export const toDoSelector = selector({
  key: 'toDoSelecter',
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === 'TO_DO'), //
      toDos.filter((toDo) => toDo.category === 'DOING'),
      toDos.filter((toDo) => toDo.category === 'DONE'),
    ];
  },
});
