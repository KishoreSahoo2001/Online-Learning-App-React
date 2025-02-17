import React from 'react';

interface WelcomeSectionProps {
  username: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  handleReset: () => void;
  isSearching: boolean;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  username, searchQuery, setSearchQuery, handleSearch, handleReset, isSearching 
}) => {
  return (
    <div>
      <h1>Hello, {username} What Do You Want To Learn?</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {isSearching ? (
          <button onClick={handleReset}>Reset</button>
        ) : (
          <button onClick={handleSearch}>Search</button>
        )}
      </div>
    </div>
  );
};

export default WelcomeSection;