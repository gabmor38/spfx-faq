/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { IFaqProps } from './IFaqProps';
import { getSP } from '../../../pnpjsConfig';
import { SPFI } from '@pnp/sp';
import '@pnp/sp/items';
import "@pnp/sp/items/get-all";
import { useEffect, useState } from 'react';

export interface IFAQList {
 questionEN: string,
 questionFR: string,

}

const Faq = (props: IFaqProps) => {

  const [faqItems, setFaqItems] = useState<any[]>([])

  const LIST_NAME: string = 'FAQ';
  const _sp:SPFI = getSP(props.context);

  const getListItems = async () => {

    const items = await _sp.web.lists.getByTitle(LIST_NAME).items.getAll();

  

    setFaqItems((items).map((item) => {
      return {
        questionEN: item.QuestionEN,
        questionFR: item.QuestionFR
      }

    }))


   

    console.log("I", items)

    
  }

  console.log(getListItems())

  useEffect(() => {

    getListItems()

  }, [])

  
  
  console.log("items", faqItems)

  return (
    <h1>hello</h1>
  )

}
export default Faq;


