/*
 * @Author: lyc
 * @Date: 2021-01-24 18:34:45
 * @LastEditors: lyc
 * @LastEditTime: 2021-01-24 19:22:48
 * @Description: file content
 */

import { gql, useMutate, useMutation } from "@apollo/client"
import { useRef } from "react"

const CREATE_CATEGORY = gql`
  mutation CreateCategory($name:String!){
    createCategory(name:$name){
      id
      name
      notes
    }
  }
`
export function UseMutation() {

  const [addCategory, { data, loding, error }] = useMutation(CREATE_CATEGORY)
  // const [createCategory] = useMutation(CREATE_CATEGORY);
  const inputE1 = useRef(null);
  console.log(data);
  if (loding) return `loding....`
  if (error) return <>error : {error}</>
  return (
    <div>
      {/* {data && data.id && (
        <>
          id:data.
        </>
      )} */}
      <input ref={inputE1} />
      <button
        onClick={
          () => addCategory({ variables: { name: inputE1.current.value } })
        }
      >创建一个分类</button>
    </div>
  )
}
