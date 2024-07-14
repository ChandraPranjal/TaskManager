import React from "react";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";

function Search({ data }) {
  // const res = searchProcess();

  const [searchResult, setSearchResult] = useState([]);
  // let searchResult;
  let fuse;

  // TODO: set the init logic in the right way
  const buildIndex = () => {
    fuse = new Fuse(data, {
      // includeMatches: true,
      includeScore: true,
      // threshold: 0.3,
      useExtendedSearch: true,
      keys: ["title", "sections.name", "sections.content"],
      // keys: ["page", "sections.title", "sections.content"]
    });
  };

  useEffect(() => {
    buildIndex();
  }, [buildIndex]);

  // buildIndex()

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query === "") {
      setSearchResult([]);

      return;
    }

    const doSearch = debounce(
      () => {
        const res = fuse.search("'" + query); // find the item include query string

        setSearchResult(searchHighlight(res, query));
      },
      500,
      {
        leading: true,
        trailing: false,
      }
    );

    doSearch();
  };

  const renderResult = (res) => {
    const resList = res.map((item) => {
      // console.log(item);

      return (
        <li className="item" key={item.id}>
          <div
            className="header"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
          {item.sections.map((section, index) => (
            <section className="section" key={index}>
              <div
                className="section-name"
                dangerouslySetInnerHTML={{ __html: section.name }}
              />
              <div
                className="section-content"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}
        </li>
      );
    });

    return resList;
  };

  const searchHighlight = (res, queryStr) => {
    const filteredRes = JSON.parse(JSON.stringify(res)).map((data) => {
      const searchText = queryStr.toLowerCase().trim();

      if (data.item.title.toLowerCase().includes(searchText)) {
        const regExp = new RegExp(searchText, "ig");

        data.item.title = data.item.title.replace(
          regExp,
          "<mark class='highlight'>$&</mark>"
        );
      }

      data.item.sections = data.item.sections.filter((section) => {
        let flag = false;

        if (section.content.toLowerCase().includes(searchText)) {
          const matchSnippetObject = getMatchSnippet(
            section.content,
            searchText
          );

          if (matchSnippetObject) {
            const { isToLeftEnd, isToRightEnd, snippet } = matchSnippetObject;
            const regExp = new RegExp(searchText, "ig");

            const highlightContent = snippet.replace(
              regExp,
              "<mark class='highlight'>$&</mark>"
            );

            if (isToLeftEnd && isToRightEnd) {
              section.content = highlightContent;
            } else if (!isToLeftEnd && isToRightEnd) {
              section.content = `...${highlightContent}`;
            } else if (isToLeftEnd && !isToRightEnd) {
              section.content = `${highlightContent}...`;
            } else {
              section.content = `...${highlightContent}...`;
            }
          }

          flag = true;
        } else {
          section.content = "";
        }

        if (section.name.toLowerCase().includes(searchText)) {
          const regExp = new RegExp(searchText, "ig");

          section.name = section.name.replace(
            regExp,
            "<mark class='highlight'>$&</mark>"
          );

          flag = true;
        }

        return flag;
      });

      return data.item;
    });

    return filteredRes;
  };

  function getMatchSnippet(string, term, numOfWords = 6) {
    const index = string.toLowerCase().indexOf(term.toLowerCase());

    if (index >= 0) {
      const _ws = [" ", "\t", "\n"]; // Whitespace
      const _pm = [".", "?", "!"]; // Punctuation marks

      let whitespace = 0;

      let left = 0;
      let isToLeftEnd = false;

      let right = 0;
      let isToRightEnd = false;

      // right trim index
      for (right = index + term.length; whitespace < numOfWords; right++) {
        if (right >= string.length || _pm.indexOf(string[right]) >= 0) {
          isToRightEnd = true;
          break;
        }

        if (_ws.indexOf(string[right]) >= 0) {
          whitespace += 1;
        }
      }

      whitespace = 0; // reset the counter of whitespace
      // left trim index
      for (left = index; whitespace < numOfWords; left--) {
        if (left < 0 || _pm.indexOf(string[left]) >= 0) {
          isToLeftEnd = true;
          break;
        }

        if (_ws.indexOf(string[left]) >= 0) {
          whitespace += 1;
        }
      }

      let offsetLeft = 0;
      let offsetRight = 0;

      if (isToLeftEnd && isToRightEnd) {
        offsetLeft = 1;
        offsetRight = 1;
      } else if (!isToLeftEnd && isToRightEnd) {
        offsetLeft = 1;
        offsetRight = 1;
      } else if (isToLeftEnd && !isToRightEnd) {
        offsetLeft = 1;
        offsetRight = 0;
      } else {
        offsetLeft = 1;
        offsetRight = 0;
      }

      return {
        isToLeftEnd,
        isToRightEnd,
        snippet: string.slice(left + offsetLeft, right + offsetRight), // return match
      };
    }

    return; // return nothing
  }

  return (
    <div className="App">
      <div>
        <input type="search" onChange={(e) => handleSearch(e)} />
      </div>
      <ul>
        {Array.isArray(searchResult) && searchResult.length !== 0
          ? renderResult(searchResult)
          : renderResult(data)}
      </ul>
    </div>
  );
}

export default Search;
