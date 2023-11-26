'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import { postGameScore } from '@/api/admin';
import Input from '@/components/common/Input/Input';
import { getUtcHours } from '@/utils/utc-times';

export default function ModifyGame() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [scoreData, setScoreData] = useState({
    playerName: '',
    team: 0,
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setScoreData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const date = getUtcHours({
      hour: scoreData.hour,
      minute: scoreData.minute,
    });

    postGameScore(id, {
      playerName: scoreData.playerName,
      team: scoreData.team,
      scoredAt: date,
    }).then(() => router.push('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="playerName" className="my-5">
        선수 이름
        <Input
          id="playerName"
          name="playerName"
          value={scoreData.playerName}
          onChange={handleChange}
          required
        />
      </label>

      <p>득점한 팀</p>

      <label htmlFor="scoreTime">
        득점 시간
        <div className="flex items-center justify-center gap-1">
          <Input
            id="scoreTime"
            type="number"
            name="hour"
            value={scoreData.hour}
            onChange={handleChange}
            min={0}
            max={23}
            maxLength={2}
          />
          :
          <Input
            type="number"
            name="minute"
            value={scoreData.minute}
            onChange={handleChange}
            min={0}
            max={59}
            maxLength={2}
          />
        </div>
      </label>
      <button
        type="submit"
        className="disabled:pointer-none w-full rounded-md border border-slate-200 bg-green-600 px-4 py-2 text-white disabled:opacity-70"
      >
        저장하기
      </button>
    </form>
  );
}