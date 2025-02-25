const FilamuHeader = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-auto">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Filamu Hub
            </h1>
          </div>
          <div className="flex items-center flex-1 justify-end"></div>
        </div>
      </div>
    </header>
  );
};

export default FilamuHeader;
