
## Hidding extra rows from Grid [implemented at VideoWrapper]
https://medium.com/@beyondborders/beginner-css-grid-sticky-navigation-scrolling-content-7c4de0a8d1dc
https://stackoverflow.com/questions/48692455/how-to-hide-implicit-grid-rows

## Group [ change child css when parent's css change ]
https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state


## AWS bucket access
https://bobbyhadz.com/blog/aws-s3-allow-public-read-access

1. first make the block public user access uncheck while creating the bucket
2. then edit the bucket policy so public only has read access to the bucket not write
3. putting object still takes accesskey and scretekey

## not Triggering parent when child element
>> Example in VoiceSearchComponent
stop propagating click evnet from child to parent

in child element

onClick(e=> e.stopPropagation())