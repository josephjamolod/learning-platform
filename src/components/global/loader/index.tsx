const Loader = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <span className="w-4 h-4 border-4 border-t-[#6652ee] border-gray-300 rounded-full animate-spin"></span>
  ) : (
    <></>
  );
};
export default Loader;
