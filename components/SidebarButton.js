export function SidebarButton({ Icon, text, }) {
  return (
    <button className='flex space-x-3 items-center hover:text-white'>
      <Icon className='w-5 h-5' />
      <span className='text-sm font-bold'>{text}</span>
    </button>
  )
};
