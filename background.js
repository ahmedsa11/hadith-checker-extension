chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: 'Check this hadith',
    id: 'check-hadith',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const AllHadith = await searchForHadithByText(info.selectionText);
  chrome.storage.local.set({ AllHadith }, async () => {
    await chrome.windows.create({
      url: chrome.runtime.getURL('popup.html'),
      type: 'popup',
    });
  });
});

const searchForHadithByText = async (text, page = 1) => {
  const res = await fetch(
    `https://dorar-hadith-api.herokuapp.com/api/search?value=${text}&page=${page}`
  );
  const data = await res.json();
  return data;
};
