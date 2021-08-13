import { useQuery, useLazyQuery, useMutation, gql } from "@apollo/client";
import { useRef } from "react";
import { UseMutation } from "./UseMutation";
const CATEGORYS = gql`
  query {
    allCategory {
      id
      name
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation($name: String!) {
    createCategory(name: $name) {
      category {
        id
      }
    }
  }
`;

export const ExchangeRates = () => {
  const { loading, error, data } = useQuery(CATEGORYS);
  const [addCategory] = useMutation(CREATE_CATEGORY);
  const inputE1 = useRef(null);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <>
      {data.allCategory.map(({ id, name }) => (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
          <CategoryByName name={"Air"} />
          <br />
        </div>
      ))}
      <input ref={inputE1} />
      <button
        onClick={() =>
          addCategory({ variables: { name: inputE1.current.value } })
        }
      >
        添加一个分类
      </button>
    </>
  );
};

// const GET_DOG_PHONE = gql`
//   query Dog($breed: String!) {
//     dog(breed: $breed) {
//       id
//       displayImage
//     }
//   }
// `;
const GATEGORY = gql`
  query CategoryByName($name: String!) {
    categoryByName(name: $name) {
      id
      name
      ingredients {
        id
        name
        notes
      }
    }
  }
`;
// const CategoryByName = ({ name }) => {
//   console.log(name);
//   const [getName, { isloding, data }] = useLazyQuery(GATEGORY);
//   if (isloding) return <p>isLoding...</p>;
//   console.log(data);
//   return (
//     <>
//       {data && data.id && (
//         <div>
//           id:{data.id} <br /> name: {data.name}
//         </div>
//       )}

//       <br />
//       <button onClick={() => getName({ variables: { name: "Log" } })}>
//         click me!
//       </button>
//     </>
//   );
// };

const CategoryByName = ({ name }) => {
  // const [getName, { isloding, data }] = useLazyQuery(GATEGORY);
  const { isloding, error, data } = useQuery(GATEGORY, {
    variables: { name },
    pollInterval: 2000,
  });
  if (isloding) return <p>isLoding...</p>;
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <>
      {/* {data && data.id && (
        <div>
          id:{data.id} <br /> name: {data.name}
        </div>
      )}

      <br />
      <button onClick={() => getName({ variables: { name: "Log" } })}>
        click me!
      </button>
       */}
      <div>
        {data && data.categoryByName.id && (
          <>
            id:{data.categoryByName.id} <br /> name: {data.categoryByName.name}
          </>
        )}
      </div>
    </>
  );
};

// const DogPhone = ({ breed }) => {
//   const { loading, error, data } = useQuery(GET_DOG_PHONE, {
//     variables: { breed }, // 传递参数到GET_DOG_PHONE
//     pollInterval: 500, // 轮询 指定以毫秒时间 与服务器数据同步
//   });
//   if (loading) return null;
//   if (error) return `Error! ${error}`;
//   return (
//     <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
//   );
// };
