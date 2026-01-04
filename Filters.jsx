export default function Filters({
  products,
  tempSearch,
  tempCategory,
  tempSort,
  setTempSearch,
  setTempCategory,
  setTempSort,
  applyFilters,
  clearFilters
}) {
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="filters-wrapper">
      <div className="filters">
        <div className="search-box">
          <input
            placeholder="Search products"
            value={tempSearch}
            onChange={e => setTempSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <select value={tempCategory} onChange={e => setTempCategory(e.target.value)}>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={tempSort} onChange={e => setTempSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        <button className="primary" onClick={applyFilters}>Search</button>
        <button className="secondary" onClick={clearFilters}>Clear</button>
      </div>
    </div>
  );
}