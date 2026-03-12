export default  function ToolCard({ title, active }) {
  return (
    <div className="w-full relative  bg-white rounded-[14px] border border-[#00000012] p-5">
      
      <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center mb-4
        ${active ? "bg-[#F54900] text-white" : "bg-[#00000008]"}`}>
        ●
      </div>

      <h4 className="font-medium text-[15px] mb-1">{title}</h4>
      <p className="text-[13px] text-gray-500">
        Generate great article with any topic you want
      </p>

    </div>
  );
}