import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FallbackProps } from '@/components/common/ErrorBoundary';
import { MatchCard } from '@/components/common/MatchCard';
import {
  COMMON_ERROR_MESSAGE,
  MATCH_LIST_API_ERROR_MESSAGE,
} from '@/constants/error';
import useIntersect from '@/hooks/useInfiniteObserver';
import { MatchListType } from '@/types/match';

type MatchListProps = {
  matchList: MatchListType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
};

export default function MatchList({
  matchList,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: MatchListProps) {
  const { ref } = useIntersect<HTMLDivElement>(async (entry, observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);

      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }
  });

  return (
    <>
      <ul>
        {matchList.map(({ id, ...match }) => (
          <li key={id} className="mb-14">
            <Link href={`match/${id}`}>
              <MatchCard {...match} className="flex flex-col">
                <MatchCard.Label className="mb-2 border-b-2 border-b-gray-5 px-1 pb-1" />
                <div className="flex h-full min-h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg">
                  <MatchCard.Background
                    viewBox="-13 117 120 50"
                    width={150}
                    height={170}
                    className="h-[180px] fill-primary"
                  />

                  <MatchCard.Team
                    teamIndex={1}
                    className="flex flex-col items-center"
                  />
                  <MatchCard.Score teamIndex={1} />
                  <MatchCard.Status />
                  <MatchCard.Score teamIndex={2} />
                  <MatchCard.Team
                    teamIndex={2}
                    className="flex flex-col items-center"
                  />
                </div>
              </MatchCard>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={ref}></div>
    </>
  );
}

MatchList.ErrorFallback = function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const router = useRouter();
  let message;

  if (error instanceof AxiosError) {
    const code = error.code;

    message =
      MATCH_LIST_API_ERROR_MESSAGE[
        code as keyof typeof MATCH_LIST_API_ERROR_MESSAGE
      ];
  } else if (error instanceof Error) {
    message = COMMON_ERROR_MESSAGE;
  }

  const resetError = () => {
    resetErrorBoundary();
    router.push('/');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-xl border border-gray-3 py-10">
      <span className="text-gary-5">⚠️ {message}</span>

      <button onClick={resetError} className="text-primary underline-offset-1">
        재시도
      </button>
    </div>
  );
};

MatchList.Skeleton = function Skeleton() {
  return (
    <>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
      <div className="mb-14 h-[200px] w-full">
        <div className="mb-2 h-[30px] rounded-xl bg-gray-1 px-1 pb-1" />
        <div className="flex h-[180px] items-center justify-around rounded-xl bg-gray-1 shadow-lg"></div>
      </div>
    </>
  );
};
