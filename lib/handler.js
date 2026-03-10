'use strict';
const dayjs = require('dayjs');

async function selection() {
  //色々定数を設定
  const random = Math.floor(Math.random() * (6718 + 1));
  const turn = ['viewCounter', 'mylistCounter', 'likeCounter', 'commentCounter', 'lastCommentTime'];
  const SORT = turn[Math.floor(Math.random() * turn.length)];
  const url = `https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search?q=&fields=contentId,title,thumbnailUrl,description,lengthSeconds,startTime&filters[startTime][gte]=2007-03-06T00:00:00%2B09:00&filters[startTime][lt]=2020-01-01T00:00:00%2B09:00&filters[viewCounter][gte]=500000&_limit=100&_offset=${random}&_sort=${SORT}&_context=nico_rikari`;

  // エンドポイントにアクセスして情報を取得
  const response = await fetch(url);
  const json = await response.json();

  //取得したオブジェクトをシャッフルし、上位10件を抽出
  const shuffled = json.data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);
  
  //レスポンスを整形して扱いやすい形に
  return selected.map(videoData => {
    const sec = videoData.lengthSeconds;
    return {
      id: videoData.contentId,
      title: videoData.title,
      description: videoData.description.replace(/<[^>]*>/g, "").slice(0, 30) + "...",
      videoTime: `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`,
      time: dayjs(videoData.startTime).format("YYYY/MM/DD HH:mm"),
      thumbnail: videoData.thumbnailUrl
    };
  });
};

module.exports = {
  selection,
};