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
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './accordion.css';
import parse from 'html-react-parser';


export interface IFAQList {
  Id?: number;
  QuestionEN?: string;
  QuestionFR?: string;
  AnswerEN?: string;
  AnswerFR?: string;
  BusinessCategory?: string;
  CategoryNameEN?: string;
  CategoryNameFR?: string;
  CategorySortOrder?: number;
  QuestionSortOrder?: number;
  IsFullRow?: string;
  expandRow?: boolean;
  Modified?: Date;

}

const Faq = (props: IFaqProps) => {

  const [faqItems, setFaqItems] = useState<any[]>([])

  const LIST_NAME: string = 'FAQ';
  const _sp:SPFI = getSP(props.context);

  const getListItems = async () => {

    const items = await _sp.web.lists.getByTitle(LIST_NAME).items.getAll();

  

    setFaqItems((items).map((item) => {
      return {
        id: item.Id,
        questionEN: item.QuestionEN,
        questionFR: item.QuestionFR,
        answerEN: item.AnswerEN,
        answerFR: item.AnswerFR,
        categoryEN: item.CategoryNameEN,
        categoryFR: item.CategoryNameFR,
        title: item.Title

      }

    }))


   

    console.log("I", items)

    
  }


  useEffect(() => {

    getListItems()

  }, [])

  
  
  console.log("items", faqItems)
  

  const categories: any[] = faqItems.map((item) => item.categoryEN);

  const distinctCategories = [...new Set(categories)];



  return (


    <>

    <Accordion allowMultipleExpanded={ true } allowZeroExpanded={ true }>
      {distinctCategories.map((item, index) => (
        <AccordionItem key={index}>
        <AccordionItemHeading >
            <AccordionItemButton  >
             {item}
             </AccordionItemButton>
        </AccordionItemHeading>
     
          <AccordionItemPanel >
            <Accordion allowMultipleExpanded={ true } allowZeroExpanded={ true }>

              {faqItems.filter(obj => obj.categoryEN === item).map((allQ, i) => (

              <AccordionItem key={i}> 
                <AccordionItemHeading>
                  <AccordionItemButton>
                    {allQ.questionEN}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {parse(allQ.answerEN)}
                </AccordionItemPanel>
              </AccordionItem>
                ))}
            </Accordion>
          </AccordionItemPanel>
          
      </AccordionItem>
      ))}
    </Accordion>
      
    </>
  )

}
export default Faq;


