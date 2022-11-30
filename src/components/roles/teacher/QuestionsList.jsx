// import React from "react";
// import { RiErrorWarningLine } from "react-icons/ri";

// const QuestionsList = () => {
//     const user_test_data = []

//     return (
//         <div className="main-container">
//             <div className="user-tests-data">
//                 <div className="head admin">
//                     <span id="id">ID</span>
//                     <span id="title">Название</span>
//                     <span id="subject">Предмет</span>
//                     <span id="ln">Язык</span>
//                     <span id="format">Формат</span>
//                 </div>

//                 {/* Reseults */}
//                 {user_test_data.length > 0 ? user_test_data.map((data, i) => {

//                     return (
//                         <div className="results admin" key={i} onClick={() => router.push(`testflow/${data.id}`)}>
//                             <span id="id">{"Арын Мұқағали"}</span>
//                             <span id="test">{"1503-12"}</span>
//                             <span id="test">{data.test_type}</span>
//                             <span id="ls">
//                                 {data.subjects.map((subject, i) => {
//                                     return (
//                                         <React.Fragment key={i}>
//                                             {!subject.is_reserve_and_required &&
//                                                 <div className="test-subject">
//                                                     {subject.title}
//                                                 </div>
//                                             }
//                                         </React.Fragment>
//                                     )
//                                 })}
//                             </span>
//                             <span id="status">
//                                 {data.status === true ?
//                                     <div className="finish">
//                                         <p>Завершено</p>
//                                         <AiOutlineCheckCircle />
//                                     </div>
//                                     :
//                                     <div className="process">
//                                         <p>В процессе</p>
//                                         <AiOutlineFieldTime />

//                                         <Link href={`testflow/${data.id}`}>
//                                             <a className="goto-testflow"><AiFillCaretRight /></a>
//                                         </Link>
//                                     </div>
//                                 }
//                             </span>
//                         </div>
//                     )
//                 })
//                 :
//                     <div className="no-content">
//                         <RiErrorWarningLine />
//                         <span>
//                             Әзірше бірде-бір оқушы тест тапсыру сессиясын ашпаған.
//                         </span>
//                     </div>
//                 }
//             </div>
//         </div>
//     )
// }

// export default QuestionsList;