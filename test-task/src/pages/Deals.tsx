import React, { useEffect, useRef, useState } from "react";
import { addToOpenedLoad, fetchContent } from "../store/DealsReducer";
import { useAppDispatch } from "../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Spinner from "../assets/icons/Spinner";
import DealCard from "../components/DealCard";
import ArrowDown from "../assets/icons/ArrowDown";
import ArrowUp from "../assets/icons/ArrowUp";

const Deals = () => {
  const leads = useSelector((state: RootState) => state.deals.leads);
  const isLoading = useSelector((state: RootState) => state.deals.isLoading);
  const openedCardId = useSelector(
    (state: RootState) => state.deals.openedCardId
  );
  const [page, setPage] = useState(1);
  const requestedPages = useRef<number[]>([]);
  const dispatch = useAppDispatch();

  const LIMIT = 3;
  const maxPages = 3;

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlNzI0NTk0ZDExMzhhZGE3YTU4YjEzODI4NzYxODU2OWFjNTU3ZWM4MDhlN2M3ZDBkYWExMzlhNjUyOWIwNjQwYzdkNDQwMDBiODI3NzQ2In0.eyJhdWQiOiI2NjM1MDg2Zi03ZTE0LTRmMDItYWQwMy04YzdiNzQyNjVmM2MiLCJqdGkiOiJlZTcyNDU5NGQxMTM4YWRhN2E1OGIxMzgyODc2MTg1NjlhYzU1N2VjODA4ZTdjN2QwZGFhMTM5YTY1MjliMDY0MGM3ZDQ0MDAwYjgyNzc0NiIsImlhdCI6MTcyOTUyOTg5MCwibmJmIjoxNzI5NTI5ODkwLCJleHAiOjE3MzE1NDI0MDAsInN1YiI6IjExNjEyMTgyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyMDIxMDgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZTRhYjQxY2YtMjg0MC00MjBjLTgzMWUtYTlmOTk4YmZkNzAyIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.ieLwSq-vzB-XdsGXWU9jVbDcYLeIoZPReqzKtPuQaqIohnehW2zQseU_6qV3oi7c3LibO42mrsMtKBfP6GLGhfbiyFkVO4Or2Vc5sW5onCF-ayRCIELBXAc79UadMV2FAWz_Ypq_beVocDmKp5QsYuUl3OgIivTXsIFtTAWoHKTUV1bVkETkZg2vwzOsFuLompmgPqMgGqszgF_KFSOlBHwVTkIcLPJKhquzMNzHF00ydSYcY9BqyokwXWugosmArmhJrUveOBrRdpwIWGSb2YgLoZnTCMryNed5147yOgZrkgXFF2FqXZH2YLOTPMLCkHBv0wR0RVUpJPKjPBR6RA";
  const subdomain = "temple23062gmailcom";

  const fetchUrl = (page: number) =>
    `http://localhost:3000/getleads/?token=${token}&subdomain=${subdomain}&limit=${LIMIT}&page=${page}`;

  const handleOpenedCard = (id: number) => {
    if (openedCardId === id) {
      dispatch(addToOpenedLoad(null));
    } else {
      dispatch(addToOpenedLoad(id));
    }
  };

  useEffect(() => {
    if (openedCardId != null) {
      dispatch(
        fetchContent(
          `http://localhost:3000/getleads/id/${openedCardId}/?token=${token}&subdomain=${subdomain}`
        )
      );
    }
  }, [openedCardId]);

  useEffect(() => {
    if (!requestedPages.current.includes(page)) {
      dispatch(fetchContent(fetchUrl(page)));
      requestedPages.current.push(page);
    }
  }, [page, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prevPage) => {
        if (prevPage <= maxPages) {
          return prevPage + 1;
        } else {
          clearInterval(interval);
          return prevPage;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="w-[100px]">
            <Spinner />
          </div>
        </div>
      ) : (
        <div className="border border-black rounded-lg overflow-hidden">
          <table className="table-auto min-w-[400px] w-full">
            <thead>
              <tr>
                <th className="border border-black p-2 bg-purple-400 text-white">
                  ID
                </th>
                <th className="border border-black p-2 bg-purple-400 text-white">
                  Название
                </th>
                <th className="border border-black p-2 bg-purple-400 text-white">
                  Бюджет
                </th>
              </tr>
            </thead>
            <tbody>
              {leads &&
                leads.map((item) => {
                  const isOpen = item.id === openedCardId;
                  return (
                    <React.Fragment key={item.id}>
                      <tr
                        onClick={() => handleOpenedCard(item.id)}
                        className="cursor-pointer hover:bg-gray-200"
                      >
                        <td className="border border-black p-2">{item.id}</td>
                        <td className="border border-black p-2">{item.name}</td>
                        <td className="border border-black p-2">
                          <div className="flex justify-between">
                            <span>{item.price}</span>
                            {isOpen ? (
                              <div className="w-[25px]"><ArrowUp/></div>
                            ) : (
                              <div className="w-[25px]"><ArrowDown/></div>
                            )}
                          </div>
                        </td>
                      </tr>
                      {isOpen && <DealCard />}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Deals;
