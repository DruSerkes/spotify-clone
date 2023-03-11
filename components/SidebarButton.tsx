interface Props {
  Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export function SidebarButton({ Icon, text, }: Props) {
  return (
    <button className='flex space-x-1 lg:space-x-3 items-center hover:text-white'>
      <Icon className='w-3 h-3 lg:w-5 lg:h-5' />
      <span className='font-bold'>{text}</span>
    </button>
  )
};
