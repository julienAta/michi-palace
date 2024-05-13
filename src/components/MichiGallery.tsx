'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'

interface MichiGalleryProps {
  title: string
  tags: string
  url: string
  createdAt: string
}
interface MichisGalleryProps {
  michis: MichiGalleryProps[]
}

function MichiGallery({ michis }: MichisGalleryProps) {
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filteredMichis = michis.filter(
    (michi) =>
      michi.title.toLowerCase().includes(search.toLowerCase()) ||
      michi.tags.toLowerCase().includes(search.toLowerCase()),
  )

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
  }

  return (
    <div className="flex flex-col items-center">
      <Input
        type="text"
        placeholder="Search by title or tags..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-1/2 rounded-lg border p-2"
      />
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {filteredMichis.map((michi, index) => (
          <div key={michi.url + index} className="group relative">
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`block cursor-pointer sm:hidden`}
              onClick={() =>
                setActiveIndex(index === activeIndex ? null : index)
              }
            >
              <Image
                width={200}
                height={200}
                className="h-auto w-full rounded-lg object-cover"
                src={michi.url}
                alt={michi.title}
              />
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-3 text-white transition-opacity duration-300 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-lg font-bold">{michi.title}</p>
                <p className="text-sm">{michi.tags}</p>
              </div>
            </div>
            <a
              href={michi.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative hidden sm:block"
            >
              <Image
                width={200}
                height={200}
                className="h-auto w-full rounded-lg object-cover"
                src={michi.url}
                alt={michi.title}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-lg font-bold">{michi.title}</p>
                <p className="text-sm">{michi.tags}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MichiGallery
