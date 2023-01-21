export interface EmailListType {
    date: number;
    id: string; 
    short_description: string;
    subject: string;
    from: {
      email: string;
      name: string;
    }
  }
  
 export interface AllEmailsType {
    list: EmailListType[];
    total : number
  }

export interface EmailBodyType {
    id: string;
    body: string;
}

export type FilterType = "unread" | "read" | "favourite";
