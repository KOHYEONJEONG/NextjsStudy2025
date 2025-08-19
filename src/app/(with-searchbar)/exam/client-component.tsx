"use client"
import ServerComponent from "./server-component"

/*export default function ClientComponent(){
    //클라이언트 컴포넌트 안에서 서버 컴포넌트를 import하지 말자
    //왜? js bundle 용량이 늘어나기 때문이다.
    //최대한 서버컴포넌트를 그래도 유지해야한다(이렇게 import를 하면 클라이언트 컴포넌트로 자동 변환된다.)
    console.log("클라이언트 컴포넌트!")
    return <ServerComponent></ServerComponent>;
 }*/

 // import를 해야한다면 이렇게 하자.
 export default function ClientComponent({children}:{children: ReactNode}){
     console.log("클라이언트 컴포넌트!")
     return <div>{children}</div>;
  }