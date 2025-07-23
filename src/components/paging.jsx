"use client";

import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import useLnggCheck from "@/utils/useLnggCheck";

// <Paging controller={controller} paging={paging} />
// <Paging pageOption={pageOption} onPaging={onPaging} />
const Paging = ({ controller, paging, pageOption, onPaging }) => {
    const { isKr } = useLnggCheck();
    const pagingHandler = controller?.handler?.paging || onPaging || ((p) => console.log(p));

    const option = {
        page: !isNaN(pageOption?.pageIndex) ? +pageOption.pageIndex : 1,
        maxPage:
            !isNaN(pageOption?.totalCount) && !isNaN(pageOption?.listRowSize)
                ? Math.ceil(pageOption.totalCount / pageOption.listRowSize)
                : 1,
        pageSize: !isNaN(pageOption?.pageRowSize) ? +pageOption.pageRowSize : 5,
    };

    const { page, maxPage, pageSize } = paging || option;
    const getPageOption = (page, maxPage, pSize) => {
        const cPage = !isNaN(page) ? +page : 1;
        const centerPage = Math.floor(pSize / 2) || 0;

        let startPage = 1,
            endPage = maxPage;

        if (endPage - startPage > pageSize) {
            // 현재 페이지에서 보정값을 뺀 값이 1 보다 작으면 1로 보정해준다.
            startPage = cPage - centerPage < 1 ? 1 : cPage - centerPage;
            // 시작페이지로 부터 끝 페이지를 구하되, startPage 에 pageSize를 더한 값이 maxPage 보다 적을 수 있으므로, 보정해준다.
            const maxEndPage = startPage + pSize - 1 > maxPage ? maxPage : startPage + pSize - 1;
            endPage = cPage + centerPage > maxEndPage ? maxEndPage : cPage + centerPage;
            // 보정값보다 현재 페이지 왼쪽이 적을 경우 끝페이지를 보정해준다.
            if (cPage - startPage < centerPage) {
                endPage += centerPage - (cPage - startPage);
            }
            // 보정값보다 현재 페이지 오른쪽이 적을 경우 시작 페이지를 보정해준다.
            if (endPage - cPage < centerPage) {
                startPage -= centerPage - (endPage - cPage);
            }
        }
        // 현재 페이지가 끝페이지를 벗어나 있으면 endPage 로 보정해준다.
        let fixCPage = cPage > endPage ? endPage : cPage;
        console.log(fixCPage,startPage,endPage)
        return {
            fixCPage,
            startPage,
            endPage,
        };
    };
    const { fixCPage, startPage, endPage } = getPageOption(page, maxPage, pageSize);
    const fixPageObj =  (pageObj, cPage, firstPage, lastPage) => {
        const addClass = "grey";
        let isClassType = true;
        if (isClassType) {
            let range = [];
            range = cPage == firstPage ? [0, 1] : range;
            range = cPage == lastPage ? [pageObj.length - 2, pageObj.length - 1] : range;
            range = lastPage == 1 ? [0, 1, 2, 3, 4] : range;

            range.forEach((n) => pageObj[n] && (pageObj[n].class = addClass));
        } else {
            if (cPage == firstPage) {
                pageObj.splice(0, 2);
            } else if (cPage == lastPage) {
                pageObj.splice(-2, 2);
            }
        }
        return pageObj;
    };
    const buildPageObj = (fixCPage, startPage, endPage) => {
        return [
            { paging: "<<", active: false },
            { paging: "<", active: false },
            ...(() => {
                const rtnObj = [];
                for (let i = startPage, max = endPage; i <= max; i++) {
                    rtnObj.push({ paging: i, active: i == fixCPage });
                }
                return rtnObj;
            })(),
            { paging: ">", active: false },
            { paging: ">>", active: false },
        ];
    };
    //const data = buildPageObj(fixCPage, startPage, endPage);
    const data = fixPageObj(buildPageObj(fixCPage, startPage, endPage), fixCPage, 1, maxPage);
    return (
        <ul className="paging">
            {data.map((item, index) => {
                switch (item.paging) {
                    case "<<":
                        return (
                            <li key={index} className={item?.class}>
                                <button className="icon" onClick={(e) => pagingHandler(1)}>
                                    <Image
                                        // src={"/images/icon-paging-first.svg"}
                                        alt={isKr ? "첫 페이지로 이동" : "Go to first page"}
                                        width={48}
                                        height={48}
                                        quality={100}
                                    />
                                </button>
                            </li>
                        );
                    case "<":
                        return (
                            <li key={index} className={item?.class}>
                                <button
                                    className="icon"
                                    onClick={(e) => pagingHandler(fixCPage - 1 > 0 ? fixCPage - 1 : 1)}
                                >
                                    <Image
                                        // src={"/images/icon-paging-prev.svg"}
                                        alt={isKr ? "이전 페이지로 이동" : "Go to previous page"}
                                        width={48}
                                        height={48}
                                        quality={100}
                                    />
                                </button>
                            </li>
                        );
                    case ">":
                        return (
                            <li key={index} className={item?.class}>
                                <button
                                    className="icon"
                                    onClick={(e) => pagingHandler(fixCPage + 1 >= maxPage ? maxPage : fixCPage + 1)}
                                >
                                    <Image
                                        // src={"/images/icon-paging-next.svg"}
                                        alt={isKr ? "다음 페이지로 이동" : "Go to next page"}
                                        width={48}
                                        height={48}
                                        quality={100}
                                    />
                                </button>
                            </li>
                        );
                    case ">>":
                        return (
                            <li key={index} className={item?.class}>
                                <button className="icon" onClick={(e) => pagingHandler(maxPage)}>
                                    <Image
                                        // src={"/images/icon-paging-last.svg"}
                                        alt={isKr ? "마지막 페이지로 이동" : "Go to last page"}
                                        width={48}
                                        height={48}
                                        quality={100}
                                    />
                                </button>
                            </li>
                        );
                    default:
                        return (
                            <li
                                key={index}
                                className={classNames({ active: item.active })}
                                style={{ cursor: "pointer" }}
                            >
                                <button className="" onClick={(e) => pagingHandler(item.paging)}>
                                    {item.paging}
                                </button>
                            </li>
                        );
                }
            })}
        </ul>
    );
};

export default Paging;
